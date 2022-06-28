function SwalFunction(icon, title, text,buttonText,Redirect) {
    swal.fire({
      icon: icon,
      title:title,
      text: text,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: buttonText,
      showCancelButton: false,
    }).then((result)=>{
      if(result.isConfirmed){
        if(Redirect.length > 0){
       window.location.href= Redirect;}
      }
    });
  };