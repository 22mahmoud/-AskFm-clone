module.exports = {
  extends: "airbnb",
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "linebreak-style": 0,
    "mport/no-named-as-default-member": 0,
    "import/no-named-as-default": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/jsx-closing-tag-location": 0,
    "import/prefer-default-export": 0
  },
  globals: {
    document: 1,
    localStorage: 1
  },
  parser: "babel-eslint"
};
