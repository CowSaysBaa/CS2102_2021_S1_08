/**
 * Router for bids
 */ 

const router = require("express").Router()
const {
    checkAuthenticatedAsCareTaker,
    checkAuthenticatedAsPetOwner,
  } = require("../commons/auth");
const bids = require("../models/bid")

// TODO: use middleware checkAuthenticatedAsPetOwner
// TODO: Pet owner can get all bids they have made (GET)
const getBidsAsPetOwner = function(req, res) {
    bids.getBidAsPetOwner(req.user.username).then(data => {
        res.render("bid", {user: req.user["username"], data: data.rows})
    });
  }

// TODO: Pet owner can place a bid (POST)
const placeBidAsPetOwner = function (req, res) {
    let results = createBid(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname, 
        new Date(req.body.bid_start_date), 
        new Date(req.body.bid_end_date)
    );

    res.render("bidPlaced", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: Pet owner can delete a bid (DELETE)
const deleteBidAsPetOwner = function (req, res) {
    let results = deleteBid(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname
    );

    res.render("bidDeleted", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: Pet owner can add a review/rating
const addReviewAsPetOwner = function (req, res) {
    let results = updateReview(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.review
    );

    res.render("reviewAdded", {
        user: req.user["username"],
        data: results,
    });
}

const addRatingAsPetOwner = function (req, res) {
    let results = updateRating(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.rating
    );

    res.render("reviewModified", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: Pet owner can modify a review/rating
const modifyReviewAsPetOwner = function (req, res) {
    let results = updateReview(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.review
    );

    res.render("reviewModified", {
        user: req.user["username"],
        data: results,
    });
}

const modifyRatingAsPetOwner = function (req, res) {
    let results = updateRating(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.rating
    );

    res.render("ratingModified", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: Pet owner can delete a review/rating
const deleteReviewAsPetOwner = function (req, res) {
    let results = deleteReview(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.review
    );

    res.render("reviewModified", {
        user: req.user["username"],
        data: results,
    });
}

const deleteRatingAsPetOwner = function (req, res) {
    let results = deleteRating(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname,
        req.body.rating
    );

    res.render("ratingModified", {
        user: req.user["username"],
        data: results,
    });
}

// TODO: use middleware checkAuthenticaedAsCareTaker
// TODO: Care Taker can accept a bid (PUT)
const acceptBidAsCareTaker = function (req, res) {
    let results = markBidAsSuccessful(
        new Date(req.body.start_date), 
        new Date(req.body.end_date), 
        req.body.category, 
        req.user.username, 
        req.body.pname, 
        req.body.ctuname
    );

    res.render("bidMarkedAsSuccessful", {
        user: req.user["username"],
        data: results,
    });
}

router.route('/')
    .get(getBidsAsPetOwner)

module.exports = router;