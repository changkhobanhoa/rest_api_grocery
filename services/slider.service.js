const { slider } = require("../models/slider.model");
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function createSlider(params, callback) {
  if (!params.sliderName) {
    return callback({
      message: "Slider Name Required",
    });
  }
  const model = new slider(params);
  model
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getSliders(params, callback) {
  const sliderName = params.sliderName;
  var condition = sliderName
    ? { sliderName: { $regex: new RegExp(sliderName), $option: "i" } }
    : {};

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  slider
    .find(condition, "sliderName sliderImage  ")
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getSliderById(params, callback) {
  const sliderId = params.sliderId;

  slider
    .findById(slider)

    .then((response) => {
      if (!response) {
        return callback("Not Found");
      } else {
        return callback(null, response);
      }
    })
    .catch((error) => {
      return callback(error);
    });
}

async function updateSlider(params, callback) {
  const sliderId = params.sliderId;

  slider
    .findByIdAndUpdate(sliderId, params, { useFindAndModify: false })

    .then((response) => {
      if (!response) {
        return callback("Not Found");
      } else {
        return callback(null, response);
      }
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deleteSlider(params, callback) {
  const sliderId = params.sliderId;

  slider
    .findByIdAndRemove(sliderId)

    .then((response) => {
      if (!response) {
        return callback("Not Found");
      } else {
        return callback(null, response);
      }
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createSlider,
  getSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
};
