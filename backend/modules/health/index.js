/**
 * Created by Angad on 24 January 2023
 */

router.get("/ping", function(req, res, next) {
  res.send("Pong!");
});