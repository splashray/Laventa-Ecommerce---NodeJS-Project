import Swal from 'sweetalert2'
import { getcartItems } from './localStorage';

export const parseRequestUrl = () => {
  const address = document.location.hash.slice(1).split('?')[0];
  const queryString =
    document.location.hash.slice(1).split('?').length === 2
      ? document.location.hash.slice(1).split('?')[1]
      : '';

  const url = address.toLowerCase() || '/';
  const r = url.split('/');
  const q = queryString.split('=');
  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
    name: q[0],
    value: q[1],
  };
};

export const rerender = async(component) =>{
  document.getElementById('main-container').innerHTML = await component.render()
  await component.after_render()
}



export const showLoading = () => {
  document.getElementById('loading-overlay').classList.add('active');
};

export const hideLoading = () => {
  document.getElementById('loading-overlay').classList.remove('active');
};

export const showMessage = (message, callback) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${message}`,
    footer: '<a href="/#/forgetpassword">Forget Password?</a>',
    width:'20em',
    height: '25em'
  })
  if (callback) {
    callback();
  }
};

export const redirectUser = () => {
  console.log(getcartItems().length);
  if (getcartItems().length !== 0) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/';
  }
};



export const showGoodMessage = (message,callback) => {
  Swal.fire({
    title: `${message}`,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

  if (callback) {
    callback();
  }

};


export const showErrMessage = (message, callback) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${message}`,
    // footer: '<a href="/#/forgetpassword">Contact Support?</a>',
    width:'20em',
    height: '25em'
  })
  if (callback) {
    callback();
  }

};