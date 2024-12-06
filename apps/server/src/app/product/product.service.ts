import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  // Create a new product
  async createProduct(
    userId: string,
    createProductDto: CreateProductDto
  ): Promise<Product> {
    const newProduct = new this.productModel({ ...createProductDto, userId });
    return newProduct.save();
  }

  // Get paginated products for a user
  async getUserProducts(
    userId: string,
    paginationDto: PaginationDto
  ): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;

    const [products, total] = await Promise.all([
      this.productModel
        .find({ userId }) // Find products created by the user
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.productModel.countDocuments({ userId }).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return { products, total, page, totalPages };
  }

  async getProductById(userId: string, productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    console.log(userId, product.userId.toString());
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    if (product.userId.toString() !== userId.toString()) {
      throw new UnauthorizedException(`You do not have access to this product`);
    }

    return product;
  }
  // Update a product owned by the user
  async updateProduct(
    userId: string,
    productId: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const product = await this.productModel.findOneAndUpdate(
      { _id: productId, userId }, // Ensure user owns the product
      updateProductDto,
      { new: true } // Return the updated product
    );

    if (!product) {
      throw new NotFoundException(
        'Product not found or not authorized to update'
      );
    }

    return product;
  }

  // Delete a product owned by the user
  async deleteProduct(userId: string, productId: string): Promise<void> {
    const result = await this.productModel.deleteOne({
      _id: productId,
      userId,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'Product not found or not authorized to delete'
      );
    }
  }

  // Search products by name, code, or category
  async searchProducts(userId: string, query: string): Promise<Product[]> {
    return this.productModel
      .find({
        userId,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { code: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
  }
}
