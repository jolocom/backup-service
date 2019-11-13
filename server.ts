import { getApp } from "./app";

const PORT = 8000;

getApp().then(app => {
  app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
  });
});
