// Button Status
const listButton = document.querySelectorAll("[button-status]");

if (listButton.length > 0) {
    let url = new URL(window.location.href);

    // Bắt sự kiện click
    listButton.forEach(button => {
        button.addEventListener("click", (event) => {
            const status = button.getAttribute("button-status");

            //code thêm (xử lý trường hợp khi bấm qua nút status mới vẫn lưu lại page cũ)
            const buttonpage = url.searchParams.get("page");
            if (buttonpage) {
                url.searchParams.delete("page")
            }
            //END code thêm

            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });



    // Thêm class Active cho nút
    const statusCurrent = url.searchParams.get("status") || ""; // tim cai active hoac inactive cua status=active tren url
    // console.log(statusCurrent);
    const buttonCurrent = document.querySelector(`[button-status="${statusCurrent}"]`);
    if (buttonCurrent) {
        buttonCurrent.classList.add("active");
    }
    // console.log(buttonCurrent);
}
// Form search (fix lai mat url khi vua tim kiem vua loc)
const formSearch = document.querySelector("[form-search]");
if (formSearch) {
    let url = new URL(window.location.href);


    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// END Button Status

//Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) {
    let url = new URL(window.location.href);

    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);


            window.location.href = url.href;
        });
    });
}
//END Pagination

// button change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if (listButtonChangeStatus.length > 0) {
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("link");
            fetch(link, {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
            })
            .then(res => res.json())
            .then(data => {
                if(data.code == 200){
                    window.location.reload();
                }
            })
        });
    });
}
// END button change Status

// Check Item
    const inputCheckAll = document.querySelector("input[name='checkAll']");
    if(inputCheckAll){
        const listInputCheckItem = document.querySelectorAll("input[name='checkItem']");

        //Bat su kien click vao` nut checkAll
        inputCheckAll.addEventListener("click", () => {
            listInputCheckItem.forEach(listinputCheckItem => {
                listinputCheckItem.checked = inputCheckAll.checked;
            });
        });

        //Bat su kien click cho nut checkItem
        listInputCheckItem.forEach(inputCheckItem => {
            inputCheckItem.addEventListener("click", () => {
                const listInputCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked");
                if(listInputCheckItem.length == listInputCheckItemChecked.length){
                    inputCheckAll.checked = true;
                }
                else{
                    inputCheckAll.checked = false;
                }
            });
        });
    }
// END Check Item

//Box actions
    const boxActions = document.querySelector("[box-actions]");
    if(boxActions){
        const button = boxActions.querySelector("button[type='button']");
        button.addEventListener("click", () => {
            const select = boxActions.querySelector("select");
            const status = select.value;
            const listInputChecked = document.querySelectorAll("input[name='checkItem']:checked");
            
            const ids = [];
            listInputChecked.forEach(input => {
                ids.push(input.value);
            });
            if(status != "" && ids.length > 0){
                const dataChangeMulti = {
                    status: status,
                    ids: ids
                };
            // Đầu tiên chạy vào API này /admin/products/change-multi thì khớp với controller bên trong product.route.js sau đó chạy vào trong cotroller là controller.changeMulti trong product.controller.js gòi trả ra cái gì đó sau đó bên này sẽ hứng bằng .then(res => res.JSON()) (hàm này chuyển thành js)


            const link = boxActions.getAttribute("box-actions");

            console.log(link);

            fetch(link, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataChangeMulti),
            })  

                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
            }
            else{
                alert("Vui Lòng chọn hành động và các Item phải được chọn");
            }
        });
    }
//END Box actions

// Xoá Item (xoá cứng)
    // const listButtonDelete = document.querySelectorAll("[button-delete]");
    // if(listButtonDelete.length > 0){
    //     listButtonDelete.forEach(button =>{
    //         button.addEventListener("click", () => {
    //             const id = button.getAttribute("button-delete");
                
    //             fetch(`/admin/products/delete/${id}`, {
    //                 method:"DELETE"
    //             })
    //             .then(res => res.json())
    //             .then(data => {
    //                 if(data.code == 200){
    //                     window.location.reload();
    //                 }
    //             })
    //         });
    //     });
    // }
// END Xoá Item


// Xoá Item (xoá mềm)
    const listButtonDelete = document.querySelectorAll("[button-delete]");
    if(listButtonDelete.length > 0){
        listButtonDelete.forEach(button =>{
            button.addEventListener("click", () => {
                const link = button.getAttribute("button-delete");
                console.log(link);
                fetch(link, {
                    method:"PATCH"
                })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
            });
        });
    }
// END Xoá Item

// Thay đổi vị trí
const listInputPosition = document.querySelectorAll("input[name='position']");
if(listInputPosition.length > 0) {
  listInputPosition.forEach(input => {
    input.addEventListener("change", () => {
      const link = input.getAttribute("link");
      const position = parseInt(input.value);

      fetch(link, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: position
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
    });
  })
}

// END Thay đổi vị trí

// Show alert (set thời gian để ẩn công thông báo khi cập nhật thành công)
const showAlert = document.querySelector("div[show-alert]");
if(showAlert){
    let time = showAlert.getAttribute("show-alert") || 3000;
    setTimeout(() => {
        showAlert.classList.add("hidden");
    }, parseInt(time));
}
// END Show alert


// upload Ảnh
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// END upload Ảnh
