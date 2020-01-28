function getImageInfo(callBack) {
  wx.cloud.database().collection('image_info').get({
    success: function (res) {
      callBack(res)
    }
  })
}

function getImageData(type, callBack) {
  wx.cloud.database()
      .collection('image_data')
      .where({
        type: type
      })
      .get({
        success: function (res) {
          callBack(res.data)
        }
      })
}

function http(url, callBack) {
  wx.request({
    url: url,
    header: { "Content-Type": "json" },
    success(res) {
      callBack(res.data);
    },
    fail(err){
      console.log(err)
    }
  });
}

function converToStarsArray(stars) {
  let num = parseInt(stars.toString().substr(0, 1));
  let arr = [], temp = 0;
  for (let i = 0; i < 5; i++) {
    temp = i >= num ? 0 : 1;
    arr.push(temp);
  }
  return arr;
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getImageInfo: getImageInfo,
  getImageData:getImageData,
  converToStarsArray: converToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
