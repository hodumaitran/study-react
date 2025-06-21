/** @type {import('prettier').Config} */
const config = {
  // Không dùng dấu chấm phẩy ở cuối dòng
  semi: false,
  // Dùng nháy đôi thay vì nháy đơn (ví dụ: "text" thay vì 'text')
  singleQuote: false,
  // Thêm dấu phẩy cuối cùng ở các object, array,... nếu có thể
  // Giúp diff git dễ hơn khi thêm dòng mới
  trailingComma: "all",
  // Giới hạn chiều dài dòng tối đa là 80 ký tự
  printWidth: 80,
  // Mỗi level indent dùng 2 khoảng trắng
  tabWidth: 2,
  // Trong JSX cũng dùng nháy đôi
  jsxSingleQuote: false,
  // Đóng thẻ `>` trong JSX sẽ xuống dòng (ví dụ: `<Component\n  />`)
  bracketSameLine: false,
  // Không cần ngoặc đơn cho arrow function nếu chỉ có 1 tham số
  arrowParens: "avoid",
  // Tự động xác định kiểu xuống dòng phù hợp với OS (LF, CRLF,...)
  endOfLine: "auto",
  // Dùng khoảng trắng thay vì tab khi indent
  useTabs: false,
  // Tùy vào CSS để xác định khoảng trắng khi format HTML
  htmlWhitespaceSensitivity: "css",
  // Tự động định dạng code bên trong các ngôn ngữ nhúng (như CSS trong HTML)
  embeddedLanguageFormatting: "auto",
  // Không ép buộc xuống dòng cho nội dung văn bản (Markdown)
  proseWrap: "preserve",
  // Dùng plugin để sắp xếp class TailwindCSS tự động theo chuẩn
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
