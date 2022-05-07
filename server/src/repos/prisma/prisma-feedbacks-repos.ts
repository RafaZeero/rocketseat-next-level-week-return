import { prisma } from '../../prisma'
import { FeedbackCreateData, FeedbacksRepos } from '../feedbacks-repos'

export class PrismaFeedbacksRepo implements FeedbacksRepos {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}
