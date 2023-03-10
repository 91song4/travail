const CartController = require("../controllers/cart.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = require("express").Router();

const cartController = new CartController();

// 장바구니 상품등록
router.post("/", authMiddleware, cartController.createCart);
// 장바구니 목록조회
router.get("/", authMiddleware, cartController.getCarts);

//장바구니 수정
router.patch("/:cartId/user/:userId", authMiddleware, cartController.editCart);

//장바구니 삭제
router.delete("/:cartId/user/:userId", authMiddleware, cartController.deleteCart);
module.exports = router;
