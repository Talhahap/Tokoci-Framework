@extends('./front.layout.navbar')

@section('content')
<div class="page-lost-password u-s-p-t-80">
    <div class="container">
        @if ($message = session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="bi bi-check-circle me-1"></i>
                {{ $message }}
            </div>
        @endif
        @if ($errors->any())
            <div class="alert alert-danger alert-dismissible fade show" role="alert">

                @foreach ($errors->all() as $error)
                    <i class="bi bi-exclamation-octagon me-1"> {{ $error }} </i><br>
                @endforeach
            </div>
        @endif
        <div class="page-lostpassword">
            <h2 class="account-h2 u-s-m-b-20">Lupa Password ?</h2>
            <h6 class="account-h6 u-s-m-b-30">Masukkan Email anda dan dapatkan email reset password di email anda.</h6>
            <form action="{{ url()->current() }}" method="POST">
                @csrf
                <div class="w-50">
                    <div class="u-s-m-b-13">
                        <label for="user-name-email">Email
                            <span class="astk">*</span>
                        </label>
                        <input type="text" id="user-name-email" name="customerEmail" class="text-field" placeholder="Email" required>
                    </div>
                    <div class="u-s-m-b-13">
                        <button type="submit" class="button button-outline-secondary">Kirim Email</button>
                    </div>
                </div>
            </form>
            <div class="page-anchor">
                <a href="{{ route('login') }}">
                    <i class="fas fa-long-arrow-alt-left u-s-m-r-9"></i>Login</a>
            </div>
        </div>
    </div>
</div>
<!-- Lost-Password-Page /- -->
   
@endsection
