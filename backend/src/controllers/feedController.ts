import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Listing from '../models/listingModel';
import User from '../models/userModel';

interface IRequestQuery {
  page?: number;
  query?: string;
  requiredSkill?: string;
}

const getFeed = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1 } = req.query as IRequestQuery;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const listings = await Listing.find().skip(skip).limit(pageSize);
  const numberOfListings = await Listing.countDocuments();
  const totalPages = Math.ceil(numberOfListings / pageSize);

  res.status(200).json({ listings, totalPages });
});

const searchFeed = asyncHandler(async (req: Request, res: Response) => {
  const { query = '', page = 1 } = req.query as IRequestQuery;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const listings = await Listing.find({
    text: { $regex: query, $options: 'i' },
  })
    .skip(skip)
    .limit(pageSize);

  const numberOfListings = await Listing.countDocuments({
    text: { $regex: query, $options: 'i' },
  });
  const totalPages = Math.ceil(numberOfListings / pageSize);

  res.status(200).json({ listings, totalPages });
});

const sortFeed = asyncHandler(async (req: Request, res: Response) => {
  const { requiredSkill = '', page = 1 } = req.query as IRequestQuery;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const listings = await Listing.find({ requiredSkill })
    .skip(skip)
    .limit(pageSize);

  const numberOfListings = await Listing.countDocuments({ requiredSkill });
  const totalPages = Math.ceil(numberOfListings / pageSize);

  res.status(200).json({ listings, totalPages });
});

// const requestListing = asyncHandler(async (req: Request, res: Response) => {
//   const listing = await Listing.findById(req.params.id);
//   const user = await User.findById(req.user?.id);

//   if (!listing || !user) {
//     res.status(400).json('Invalid Request');
//     return;
//   }

//   const isRequested = listing.requests.some(
//     (request) => request.toString() === user._id?.toString()
//   );

//   if (isRequested || user._id?.toString() === listing.user.toString()) {
//     res.status(400).json('Invalid Request');
//     return;
//   }

//   listing.requests.push(user._id);
//   await listing.save();

//   res.status(200).json(user._id);
// });

const getFeedListing = asyncHandler(async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404).json('Listing not found');
    return;
  }

  res.status(200).json(listing);
});

export { getFeed, searchFeed, sortFeed, getFeedListing };
