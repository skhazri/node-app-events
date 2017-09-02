module.exports = {
  showHome: (req, res) => {
   // render look in views folder
   res.render('pages/home');
   // res.send(`express server is running on port ${port}`);
   }
};
