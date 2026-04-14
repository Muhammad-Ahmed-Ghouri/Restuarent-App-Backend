const testUserController = (req, res) => {
  try {
    res.status(200).send('<h1>Hi, Test API has been hit successfully.</h1>');
  } catch (error) {
    console.log("Error in test API", error);
  }
};

module.exports = { testUserController };
