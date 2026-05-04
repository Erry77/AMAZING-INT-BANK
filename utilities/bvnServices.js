// Mock NIBSS verification

exports.verifyBVN = async (bvn) => {
  if (bvn.length === 11) {
    return {
      status: true,
      data: {
        fullName: "Test User",
        bvn
      }
    };
  }
  return { status: false };
};

exports.verifyNIN = async (nin) => {
  if (nin.length === 11) {
    return {
      status: true,
      data: {
        fullName: "Test User",
        nin
      }
    };
  }
  return { status: false };
};