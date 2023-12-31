@extends('front.layout.navbar')

@section('content')
    <!-- Page Introduction Wrapper -->
    <div class="page-style-a">
        <div class="container">
            <div class="page-intro">
                <h2>Checkout</h2>
                <ul class="bread-crumb">
                    <li class="has-separator">
                        <i class="ion ion-md-home"></i>
                        <a href="/">Home</a>
                    </li>
                    <li class="is-marked">
                        <a>Checkout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Page Introduction Wrapper /- -->
    <!-- Checkout-Page -->
    <div class="page-checkout u-s-p-t-80">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <form action="{{ url()->current() }}" method="POST">
                        @csrf
                        <div class="row">
                            <!-- Billing-&-Shipping-Details -->
                            <div class="col-lg-6">
                                <h4 class="section-h4">Alamat Pengiriman</h4>
                                <!-- Form-Fields -->
                                <div class="group-inline u-s-m-b-13">
                                    <div class="group-1 u-s-p-r-16">
                                        <label for="first-name">Nama Lengkap
                                            <span class="astk">*</span>
                                        </label>
                                        <input type="text" id="first-name" name="nama" class="text-field"
                                            placeholder="Nama Lengkap" value="{{ Session::get('nama.customer') }}" required>
                                    </div>
                                </div>
                                <div class="u-s-m-b-13">
                                    <label for="phone">No Telepon
                                        <span class="astk">*</span>
                                    </label>
                                    <input type="number" id="phone" name="telp" class="text-field"
                                        placeholder="Nomor Telepon" value="{{ Session::get('telp.customer') }}" required>
                                </div>
                                <div class="street-address u-s-m-b-13">
                                    <label for="req-st-address">Alamat Lengkap
                                        <span class="astk">*</span>
                                    </label>
                                    <textarea class="text-area" id="order-notes" name="alamat" placeholder="Alamat Lengkap" required></textarea>
                                </div>
                                <div class="u-s-m-b-13">
                                    <label for="provinceSelect">Provinsi
                                        <span class="astk">*</span>
                                    </label>
                                    <div class="select-box-wrapper">
                                        <select class="select-box" id="provinceSelect" required>
                                            <option selected="selected" value="" disabled>Pilih Provinsi...</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="u-s-m-b-13">
                                    <label for="citySelect">Kota
                                        <span class="astk">*</span>
                                    </label>
                                    <div class="select-box-wrapper">
                                        <select class="select-box" id="citySelect" required>
                                            <option selected="selected" value="" disabled>Pilih kota...</option>
                                        </select>
                                    </div>
                                    <input type="hidden" name="kota" id="kota" value="">
                                </div>
                                <div class="u-s-m-b-13">
                                    <label for="postcode">Kode Pos
                                        <span class="astk">*</span>
                                    </label>
                                    <input type="text" id="postcode" name="kodepos" class="text-field" class="Kode Pos"
                                        placeholder="Kode Pos" required>
                                </div>
                                <div class="group-inline u-s-m-b-13">
                                    <div class="group-1 u-s-p-r-16">
                                        <input type="hidden" id="email" class="text-field" class="Email Address"
                                            placeholder="Email Address" value="{{ Session::get('email.customer') }}"
                                            required>
                                    </div>
                                </div>
                            </div>
                            <!-- Billing-&-Shipping-Details /- -->
                            <!-- Checkout -->
                            <div class="col-lg-6">
                                <h4 class="section-h4">Pesanan</h4>
                                <div class="order-table">
                                    <table class="u-s-m-b-13">
                                        <thead>
                                            <tr>
                                                <th>Produk</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($cart as $item)
                                                <tr>
                                                    <td>
                                                        <h6 class="order-h6">{{ substr($item['product_name'], 0, 30) }} ....
                                                        </h6>
                                                        <span class="order-span-quantity">x {{ $item['quantity'] }}</span>
                                                    </td>
                                                    <td>
                                                        <h6 class="order-h6">Rp.
                                                            {{ number_format($item['product_price'] * $item['quantity'], 0, ',00', '.') }}
                                                        </h6>
                                                    </td>
                                                </tr>
                                            @endforeach
                                            <tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Subtotal</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">Rp.
                                                        {{ number_format($subtotal, 0, ',00', '.') }}
                                                    </h3>
                                                    <input type="hidden" id="subtotal" value="{{ $subtotal }}">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Shipping</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3" id="ongkir">Rp.
                                                        {{ number_format(0, 0, ',00', '.') }}
                                                    </h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Total</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3" id="total">Rp.
                                                        {{ number_format($subtotal, 0, ',00', '.') }}
                                                    </h3>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button type="submit" class="button button-outline-secondary">Buat Pesanan</button>
                                </div>
                            </div>
                            <!-- Checkout /- -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Checkout-Page /- -->
@endsection

@section('javascript')
    <script type="text/javascript" src="{{ asset('front/') }}/js/checkout.js"></script>
@endsection
