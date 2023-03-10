const router = require('express').Router();

const { authMiddleware } = require('../middleware/auth.middleware');
const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

// 주문작성
router.post('/', authMiddleware, orderController.createOrder);
// 주문목록조회
router.get('/', authMiddleware, orderController.getOrders);
// 주문상세조회
router.get('/:orderDetailId', authMiddleware, orderController.getOrderDetail);
// 주문취소
router.delete('/:orderId', authMiddleware, orderController.deleteOrder);


module.exports = router;