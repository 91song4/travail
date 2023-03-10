const {addNewAddressValidation} = require("../../validations");
const AddressService = require("../services/address.service.js");

class AddressController {
    // Service
    addressService = new AddressService();

    // 새 주소 등록
    addnewAddress = async (req, res, next) => {
        try {
            const {userData} = req;
            const {address, addressName, name} = await addNewAddressValidation.validateAsync(
                req.body
            );

            await this.addressService.createAddress(
                userData.userId,
                address,
                addressName,
                name
            );
            return res
                .status(200)
                .json({message: '등록완료'});
        } catch (error) {
            if (error.isJoi) {
                // return res.status(422).json({message: error.details[0].message});
                next(error)
            }
            // res.status(500).json({message: error.message});
            next(error);
        }
    };

    // 회원 주소 조회 [완료]
    getAddress = async (req, res, next) => {
        // auth Middleware에서 인증후 넘어오게 한다면?

        try {
            const userId = +req.params.userId;
            const user_address = await this.addressService.getAddress(userId);
            return res.status(200).json({user_address});
        } catch (error) {
            // return res.status(error.status).json({success: error.success, message: error.message});
            next(error)
        }
    };

    // 회원주소 상세정보조회
    getthisAddress = async (req, res) => {
        try {
            const {userId, addressId} = req.params;
            const user_address_detail = await this.addressService.getThisAddress(userId, addressId);
            return res.status(200).json({user_address_detail});
        } catch (error) {
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };

    // 회원 주소 수정
    editAddress = async (req, res) => {
        try {
            const {userId, addressId} = req.params;
            const {address, addressName, name} = await addNewAddressValidation.validateAsync(
                req.body
            );

            const editAddressResult = await this.addressService.editAddress(
                userId,
                addressId,
                address,
                addressName,
                name
            );
            return res.status(200).json({editAddressResult});
        } catch (error) {
            if (error.name === "ValidationError") {
                error.status = 412;
                error.success = false;
                error.message = "주소 형식이 올바르지 않습니다.";
            }
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };
    // 회원 주소 삭제 //
    deleteAddress = async (req, res) => {
        try {
            const {userId, addressId} = req.params;
            const destoyAddress = await this.addressService.deleteAddress(userId, addressId);
            return res.status(200).json({success: destoyAddress, message: destoyAddress.message});
        } catch (error) {
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };
}

module.exports = AddressController;
