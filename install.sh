# Downloads third party libraries.

if [ ! -d libraries ]; then
  mkdir libraries
  mkdir libraries/jquery
  cd libraries/jquery
  curl -O http://code.jquery.com/jquery-1.8.3.min.js
else
  echo 'libraries directory already exists.'
fi

