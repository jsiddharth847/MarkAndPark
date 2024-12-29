const generateSpots = function (next) {
  if (this.isNew) {
    this.spots = Array.from({ length: this.quantity }, (_, i) => ({
      number: `${this.spotLocation}-${i + 1}`, // Unique spot number
      isBooked: false,
    }));
  }
  next();
};

module.exports = generateSpots;
