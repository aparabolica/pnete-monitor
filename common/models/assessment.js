module.exports = function(Assessment) {

  Assessment.validatesInclusionOf('diagnosis', {in: ['complete', 'partial', 'incomplete']});

};
