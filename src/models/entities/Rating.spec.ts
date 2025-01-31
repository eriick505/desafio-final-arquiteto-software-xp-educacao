import { RatingModel } from './Rating';
import { describe, expect } from "@jest/globals"

describe("RatingModel", () => {
  it("should be able to create a new rating", () => {
    const rating = RatingModel.create({ rating: 5 });

    expect(rating).toBeInstanceOf(RatingModel);
    expect(rating.rating).toBe(5);
  });

  it("should not be able to create a new rating with a rating less than 1", () => {
    expect(() => {
      RatingModel.create({ rating: 0 });
    }).toThrowError();
  });
})