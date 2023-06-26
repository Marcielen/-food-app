import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { EnumWebServices } from "./enum/EnumWebServices";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DatailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

import multer from "multer";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderyController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// routes user

router.post(EnumWebServices.USERS, new CreateUserController().handle);
router.post(EnumWebServices.SESSION, new AuthUserController().handle);
router.get(
  EnumWebServices.ME,
  isAuthenticated,
  new DetailUserController().handle
);

// routes category

router.post(
  EnumWebServices.CATEGORY,
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get(
  EnumWebServices.CATEGORY,
  isAuthenticated,
  new ListCategoryController().handle
);

// routes product

router.post(
  EnumWebServices.PRODUCT,
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  EnumWebServices.PRODUCT_CATEGORY,
  isAuthenticated,
  new ListByCategoryController().handle
);

// router Order

router.post(
  EnumWebServices.ORDER,
  isAuthenticated,
  new CreateOrderController().handle
);

router.delete(
  EnumWebServices.ORDER,
  isAuthenticated,
  new RemoveOrderController().handle
);
router.post(
  EnumWebServices.ORDER_ADD,
  isAuthenticated,
  new AddItemController().handle
);
router.delete(
  EnumWebServices.ORDER_REMOVE,
  isAuthenticated,
  new RemoveItemController().handle
);
router.put(
  EnumWebServices.ORDER_SEND,
  isAuthenticated,
  new SendOrderController().handle
);
router.get(
  EnumWebServices.ORDER_LIST,
  isAuthenticated,
  new ListOrderyController().handle
);
router.get(
  EnumWebServices.ORDER_DETAIL,
  isAuthenticated,
  new DetailOrderController().handle
);
router.put(
  EnumWebServices.ORDER_FINISH,
  isAuthenticated,
  new FinishOrderController().handle
);

export { router };
