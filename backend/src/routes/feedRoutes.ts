import express from 'express';
import {
  getFeed,
  searchFeed,
  sortFeed,
  // requestListing,
  getFeedListing,
} from '../controllers/feedController';

const router = express.Router();

router.route('/').get(getFeed);
router.route('/search').get(searchFeed);
router.route('/sort').get(sortFeed);
// router.route('/:id').put(protect, requestListing).get(getFeedListing);

module.exports = router;
