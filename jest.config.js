// jest config, bắt buột config bable.config.js(nếu ko hay bị lỗi)
module.exports = {
    //transform file jsx
    // có thể ko cần , do đã dùng: @babel/plugin-transform-modules-commonjs
    transform:  { "^.+\\.jsx?$": "babel-jest" },
    moduleDirectories: ['node_modules', 'src'],
    //ingore : file css, img,..vv khi import vào file js
    // tạo ra thư mục internal/mock/ copy vào
    moduleNameMapper: {
        '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internal/mock/styleMock.js',
        '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/internal/mock/fileMock.js',
      },
}