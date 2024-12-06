import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Product } from './entities/product.schema';
import { PaginationDto } from '../common/dto/pagination.dto';
import { isValidObjectId } from 'mongoose';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @GetUser('_id') userId: string,
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    return this.productService.createProduct(userId, createProductDto);
  }

  @Get()
  async getProducts(
    @GetUser('_id') userId: string,
    @Query() paginationDto: PaginationDto
  ): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    return this.productService.getUserProducts(userId, paginationDto);
  }

  @Get(':id')
  async getProductById(
    @GetUser('_id') userId: string,
    @Param('id') id: string
  ): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid product ID format');
    }
    return this.productService.getProductById(userId, id);
  }

  @Patch(':id')
  async updateProduct(
    @GetUser('_id') userId: string,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid product ID format');
    }
    return this.productService.updateProduct(userId, id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(
    @GetUser('_id') userId: string,
    @Param('id') id: string
  ): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid product ID format');
    }
    return this.productService.deleteProduct(userId, id);
  }

  @Get('search')
  async searchProducts(
    @GetUser('_id') userId: string,
    @Query('query') query: string
  ): Promise<Product[]> {
    return this.productService.searchProducts(userId, query);
  }
}
