export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss": {},
    "postcss-preset-env": {},
    "autoprefixer": {},
    "cssnano": {},
  },
};

/**
 * You can use this syntax:-
 * export default {
  plugins: [
    "postcss-import",
    "postcss-preset-env",
    "tailwindcss",
    "autoprefixer",
  ]
}; but you cant use custom configs there,use only if you want default configs
 * or this syntax 
 * export default {
  plugins: { //changed the array to object
    "postcss-import":{},
    "postcss-preset-env":{},
    "autoprefixer":{},
    "tailwindcss",:{}
  }
};
 * 
 * here you dont need to import just directly write the package name it will handle that
 */
