export class InvalidRatingLength extends Error {
  constructor(rating: number) {
    super(`The rating ${rating} is invalid and must be between 1 and 5`);
    this.name = 'InvalidRatingLength';
  }
}