var cb = {

  registerCB: function(err, data){
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  },

  loginCB: function(err, data){
    if (err) {
      console.error("error", err);
    } else {
      console.log("successF");
      console.log(data);
      ux.afterLogin();
    }
  }

};
