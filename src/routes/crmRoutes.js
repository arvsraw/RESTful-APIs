import {
  addNewContact,
  getContacts,
  getContactWithId,
  updateContact,
  deleteContact,
} from "../controllers/crmController";
import { login, register, loginRequired } from "../controllers/userControllers";

const routes = (app) => {
  app
    .route("/contacts")

    // get all the contacts
    .get(
      (req, res, next) => {
        // middleware
        console.log(`request from: ${req.originalUrl}`);
        console.log(`request type: ${req.method}`);
        next();
      },
      loginRequired,
      getContacts
    )

    // add a new Contact
    .post(loginRequired, addNewContact);

  app
    .route("/contact/:contactId")

    // get specific contact ie: by using id
    .get(loginRequired, getContactWithId)

    //update contact
    .put(loginRequired, updateContact)

    //delete contact
    .delete(loginRequired, deleteContact);

  // registration routes
  app.route("/auth/register").post(register);

  app.route("/login").post(login);
};

export default routes;
