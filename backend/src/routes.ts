import { Router } from "express";
import { EnumWebServices } from "./enum/EnumWebService";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { DetailUserController } from "./controller/user/DatailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateProductController } from "./controller/product/CreateProductController";
import { ListByProductController } from "./controller/product/ListByProductController";
import { RemoveProductController } from "./controller/product/RemoveProductController";
import { CreateItemController } from "./controller/ordersRegister/CreateItemsController";
import { ListItemsController } from "./controller/ordersRegister/ListItemsController";
import { RemoveItemsController } from "./controller/ordersRegister/RemoveItemsController";
import { UpdateItemsController } from "./controller/ordersRegister/UpdateItemsController";
import { ListCategoryController } from "./controller/category/ListByCategoryController";
import { CreateCategoryController } from "./controller/category/CreateCategoryController";
import { RemoveCategoryController } from "./controller/category/RemoveCategoryController";
import { CreateBuyController } from "./controller/buy/CreateBuyController";
import { ListBuyController } from "./controller/buy/ListBuyController";
import { RemoveBuyController } from "./controller/buy/RemoveBuyController";
import { UpdateProductController } from "./controller/product/UpdateProductController";
import { CreateOrdersPadController } from "./controller/ordersPad/CreateOrdersPadController";
import { ListOrdersPadController } from "./controller/ordersPad/ListOrdersPadController";
import { RemoveOrdersPadController } from "./controller/ordersPad/RemoveOrdersPadController";
import { CreateOrderPadProductController } from "./controller/ordersPadProduct/CreateOrdersPadProductController";
import { ListOrdersPadProductontroller } from "./controller/ordersPadProduct/ListOrdersPadProductsController";
import { RemoveOrdersPadProductController } from "./controller/ordersPadProduct/RemoveOrdersPadProductController";
import { UpdateOrdersPadProductController } from "./controller/ordersPadProduct/UpdateOrdersPadProductController";
import { UpdateOrdersPadController } from "./controller/ordersPad/UpdateOrdersPadController";
import { CreatePayController } from "./controller/pay/CreatePayController";
import { ListPayController } from "./controller/pay/ListPayController";
import { ListProductSoldController } from "./controller/ProductSold/ListProductSoldController";
import { CreateProductSoldController } from "./controller/ProductSold/CreateProductSoldController";
import { HealthController } from "./controller/health/HealthController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

export { router };

router.post(EnumWebServices.USERS, new CreateUserController().handle);
router.post(EnumWebServices.SESSION, new AuthUserController().handle);
router.get(
  EnumWebServices.ME,
  isAuthenticated,
  new DetailUserController().handle
);

// product
router.post(
  EnumWebServices.PRODUCT_CREATE,
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);
router.put(
  EnumWebServices.PRODUCT_UPDATE,
  isAuthenticated,
  upload.single("file"),
  new UpdateProductController().handle
);
router.get(
  EnumWebServices.PRODUCT,
  isAuthenticated,
  new ListByProductController().handle
);
router.delete(
  EnumWebServices.PRODUCT_REMOVE,
  isAuthenticated,
  new RemoveProductController().handle
);

// items
router.post(
  EnumWebServices.ORDERS_REGISTER_CREATE,
  isAuthenticated,
  new CreateItemController().handle
);
router.get(
  EnumWebServices.ORDERS_REGISTER,
  isAuthenticated,
  new ListItemsController().handle
);
router.delete(
  EnumWebServices.ORDERS_REGISTER_REMOVE,
  isAuthenticated,
  new RemoveItemsController().handle
);
router.put(
  EnumWebServices.ORDERS_REGISTER_UPDATE,
  isAuthenticated,
  new UpdateItemsController().handle
);

// category
router.post(
  EnumWebServices.CATEGORY_CREATE,
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get(
  EnumWebServices.CATEGORY,
  isAuthenticated,
  new ListCategoryController().handle
);
router.delete(
  EnumWebServices.CATEGORY_REMOVE,
  isAuthenticated,
  new RemoveCategoryController().handle
);

// buy

router.post(
  EnumWebServices.BUY_CREATE,
  isAuthenticated,
  new CreateBuyController().handle
);
router.get(
  EnumWebServices.BUY,
  isAuthenticated,
  new ListBuyController().handle
);
router.delete(
  EnumWebServices.BUY_REMOVE,
  isAuthenticated,
  new RemoveBuyController().handle
);

// orders pad

router.post(
  EnumWebServices.ORDERS_PAD_CREATE,
  isAuthenticated,
  new CreateOrdersPadController().handle
);
router.get(
  EnumWebServices.ORDERS_PAD,
  isAuthenticated,
  new ListOrdersPadController().handle
);
router.put(
  EnumWebServices.ORDERS_PAD_UPDATE,
  isAuthenticated,
  new UpdateOrdersPadController().handle
);
router.delete(
  EnumWebServices.ORDERS_PAD_REMOVE,
  isAuthenticated,
  new RemoveOrdersPadController().handle
);

// orders product
router.post(
  EnumWebServices.ORDERS_PAD_CREATE_PRODUCT,
  isAuthenticated,
  new CreateOrderPadProductController().handle
);
router.get(
  EnumWebServices.ORDERS_PAD_PRODUCT,
  isAuthenticated,
  new ListOrdersPadProductontroller().handle
);
router.delete(
  EnumWebServices.ORDERS_PAD_REMOVE_PRODUCT,
  isAuthenticated,
  new RemoveOrdersPadProductController().handle
);
router.put(
  EnumWebServices.ORDERS_PAD_UPDATE_PRODUCT,
  isAuthenticated,
  new UpdateOrdersPadProductController().handle
);

// pay

router.post(
  EnumWebServices.PAY_CREATE,
  isAuthenticated,
  new CreatePayController().handle
);
router.get(
  EnumWebServices.PAY,
  isAuthenticated,
  new ListPayController().handle
);

// product sold

router.post(
  EnumWebServices.PRODUCT_SOLD_CREATE,
  isAuthenticated,
  new CreateProductSoldController().handle
);
router.get(
  EnumWebServices.PRODUCT_SOLD,
  isAuthenticated,
  new ListProductSoldController().handle
);

// health
router.get(EnumWebServices.HEALTH, new HealthController().handle);
