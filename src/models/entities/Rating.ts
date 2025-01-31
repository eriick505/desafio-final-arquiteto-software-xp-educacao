import { InvalidRatingLength } from "./erros";

export interface IRatingProps {
  rating: number;
}

export class RatingModel {
  private _props: IRatingProps;

  constructor(props: IRatingProps) {
    this._props = props;
  }

  public static create(props: IRatingProps) {
    if (!this.validateRatingLength(props.rating)) {
      throw new InvalidRatingLength(props.rating);
    }

    return new RatingModel({ rating: props.rating });
  }

  public get rating() {
    return this._props.rating;
  }

  private static validateRatingLength(rating: number): boolean {
    return rating > 0 && rating <= 5;
  }
}