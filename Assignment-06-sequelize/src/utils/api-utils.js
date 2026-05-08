export const isExistById = async (item, model, res, dataName = null, message = null) => {
	if (item) {
		const data = await model.findByPk(item);
		if (!data) {
			// throw new Error(message || `${dataName} with id: (${item}) not found.`);
			return res.status(404).json({ success: false, message: message || `${dataName} with id: (${item}) not found.` });
		}
		return data;
	}
	return null;
};
