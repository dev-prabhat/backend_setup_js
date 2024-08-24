import { Router } from "express";
import {
  createSale,
  getRevenueForADay,
  getRevenueForAMonth,
  getRevenueForAYear,
  getSaleForADay,
} from "../controllers/sale.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT)
router.route("/:date").get(getSaleForADay);
router.route("/createSale").post(createSale);
router.route("/revenue/day/:date").get(getRevenueForADay);
router.route("/revenue/month/:year/:month").get(getRevenueForAMonth);
router.route("/revenue/year/:year").get(getRevenueForAYear);

export default router;
