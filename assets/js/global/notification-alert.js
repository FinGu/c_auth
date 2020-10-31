(function ($) {
    "use strict";

    $('.info-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'info',
            title: 'Do not press this button'
        })
    });

    $('.success-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Signed in successfully'
        })
    });

    $('.danger-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'error',
            title: 'Login Error'
        })
    });

    $('.warning-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'warning',
            title: 'Do not press this button'
        })
    });

    $('.top-start-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Top Start'
        })
    });

    $('.top-center-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Top Center'
        })
    });

    $('.top-end-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Top End'
        })
    });

    $('.middle-start-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'center-start',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Middle Start'
        })
    });

    $('.middle-center-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Middle Center'
        })
    });

    $('.middle-end-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'center-end',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Middle End'
        })
    });

    $('.bottom-start-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Bottom Start'
        })
    });

    $('.bottom-center-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Bottom Center'
        })
    });

    $('.bottom-end-toast').on("click", function () {
        const toast = swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000
        });

        toast({
            type: 'success',
            title: 'Position Bottom End'
        })
    });

})(jQuery);