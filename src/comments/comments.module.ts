import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment, User, Review])],
})
export class CommentsModule {}
