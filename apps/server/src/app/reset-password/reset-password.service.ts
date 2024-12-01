import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { MailtrapClient } from 'mailtrap';

@Injectable()
export class ResetPasswordService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async forgotPassword(email: string) {
    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('No user found with this email');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

     const resetURL = `${process.env.FRONTEND_URL}/reset-password?email=${email}?token=${resetToken}`;
    

    try {
      await this.sendResetPasswordEmail(user.email, resetURL);

      return {
        message: 'Password reset link sent to your email',
        resetToken,
        resetTokenSent: true,
      };
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      throw new BadRequestException(
        'Could not send reset password email',
        error
      );
    }
  }

  async resetPassword(token: string, newPassword: string) {
    // Hash the incoming token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with valid reset token
    const user = await this.userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    // Check if user exists
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return {
      message: 'Password reset successful',
    };
  }

  private async sendResetPasswordEmail(email: string, resetURL: string) {
    try {
      const TOKEN = '05407a3ebcc64b7731fe027efd2bf537';

      const client = new MailtrapClient({
        token: TOKEN,
        testInboxId: 3313127,
      });

      const sender = {
        email: 'noreply@example.com',
        name: 'Mailtrap Test',
      };
      const recipients = [
        {
          email: email,
        },
      ];

      client.testing
        .send({
          from: sender,
          to: recipients,
          subject: 'Password Reset',
          html: `
           <h1>Password Reset</h1>
           <p>You have requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetURL}">Reset Password</a>
            <p>This link will expire in 10 minutes.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
          `,
          category: 'Integration Test',
        })
        .then(console.log, console.error);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
