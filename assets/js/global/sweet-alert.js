(function ($) {
    "use strict";

    $('.basic-alert').on("click", function () {
        swal("Hello world!");
    });

    $('.title-alert').on("click", function () {
        swal({
            title: "Basic version",
            text: "Morbi eget ultricies mauris, in tincidunt ex. Quisque ligula ligula, luctus a magna vel, pulvinar blandit lacus. Sed efficitur sit amet urna ac semper."
        });
    });

    $('.success-alert').on("click", function () {
        swal({
            type: "success",
            title: "Success",
            text: "Morbi eget ultricies mauris, in tincidunt ex. Quisque ligula ligula, luctus a magna vel, pulvinar blandit lacus. Sed efficitur sit amet urna ac semper."
        });
    });

    $('.error-alert').on("click", function () {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        });
    });

    $('.img-content-alert').on("click", function () {
        swal({
            imageUrl: 'https://via.placeholder.com/640x420',
            imageAlt: 'Coffee',
            title: "Breakfast",
            text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas cupiditate non provident."
        });
    });

    $('.html-content-alert').on("click", function () {
        swal({
            title: '<i>HTML</i> <u>example</u>',
            type: 'info',
            html:
            'You can use <strong>bold text</strong>, ' +
            '<a href="//g-axon.com">links</a> ' +
            'and other HTML tags',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="icon icon-like icon-fw"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="icon icon-thumbs-down icon-fw"></i>',
            cancelButtonAriaLabel: 'Thumbs down'
        });
    });

    $('.top-position-alert').on("click", function () {
        swal({
            position: 'top-start',
            type: 'success',
            title: 'Custom Position',
            text: 'Alert message postion Top Start'
        });
    });

    $('.parameter-alert').on("click", function () {
        const swalWithBootstrapButtons = swal.mixin({
            confirmButtonClass: 'btn btn-success mb-2',
            cancelButtonClass: 'btn btn-danger mr-2 mb-2',
            buttonsStyling: false,
        });

        swalWithBootstrapButtons({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                swalWithBootstrapButtons(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        });
    });

    $('.auto-close-alert').on("click", function () {
        let timerInterval;
        swal({
            title: 'Auto close alert!',
            html: 'I will close in <strong></strong> milliseconds.',
            timer: 4000,
            onOpen: () => {
                swal.showLoading();
                timerInterval = setInterval(() => {
                    swal.getContent().querySelector('strong')
                        .textContent = swal.getTimerLeft()
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            }
        });
    });

})(jQuery);