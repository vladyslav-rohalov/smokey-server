import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { ReviewRating } from 'src/review-rating/entities/review-rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistedTokensModule } from 'src/blacklisted-tokens/blacklisted-tokens.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Order,
      Review,
      Comment,
      ReviewRating,
      JwtModule,
    ]),
    forwardRef(() => AuthModule),
    BlacklistedTokensModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
