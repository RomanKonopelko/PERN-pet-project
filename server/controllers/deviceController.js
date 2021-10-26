const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let filename = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", filename));

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }
      const device = await Device.create({ name, price, brandId, typeId, filename });
      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    const { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll();
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params,
    const device = await Device.findOne({
      where: { id },
      include:[{model:DeviceInfo,as:'info'}]
    })
    return res.json(device)
  }
}

module.exports = new DeviceController();
