module.exports = function(Indicator) {

  Indicator.validatesInclusionOf('type', {in: ['integer', 'percentual', 'discursive']});
};
