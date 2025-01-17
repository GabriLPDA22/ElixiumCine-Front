<template>
    <App>
        <!-- Banner -->
        <section class="banner">
            <img src="../../images/banner-cines.jpg" alt="Sala de cine" class="banner__image">
        </section>

        <!-- Main Content -->
        <main class="cines">
            <h1 class="cines__title">NUESTROS CINES</h1>
            <div class="cines__grid">

                <router-link to="/gran-casa" class="cines__link">
                    <div class="cines__card" style="background-image: url('../../images/gran-casa.jpg');">
                        <div class="cines__card-title">GRAN CASA</div>
                        <p class="cines__card-description">
                            <strong>Butacas estándar y premium:</strong> Comodidad asegurada para todos los gustos. <br>
                            <strong>Tecnología de sonido:</strong> Dolby Atmos para una experiencia inmersiva. <br>
                            <strong>Ambiente familiar:</strong> Perfecto para disfrutar en familia o con amigos.
                        </p>
                    </div>
                </router-link>
                <router-link to="/puerto-venecia" class="cines__link">
                    <div class="cines__card" style="background-image: url('../../images/puerto-venecia.jpg');">
                        <div class="cines__card-title">PUERTO VENECIA</div>
                        <p class="cines__card-description">
                            <strong>Butacas reclinables de lujo:</strong> Para una experiencia de máximo confort. <br>
                            <strong>Sistema de sonido envolvente:</strong> Para que sientas cada escena. <br>
                            <strong>Ideal para ir en pareja:</strong> Un ambiente cómodo y moderno.
                        </p>
                    </div>
                </router-link>
                <router-link to="/torre-outlet" class="cines__link">
                    <div class="cines__card" style="background-image: url('../../images/torre-outlet.jpg');">
                        <div class="cines__card-title">TORRE OUTLET</div>
                        <p class="cines__card-description">
                            <strong>Sala estándar:</strong> Para los amantes del cine tradicional. <br>
                            <strong>Iluminación tenue:</strong> Crea un ambiente acogedor para una experiencia de calidad.
                            <br>
                            <strong>Accesibilidad:</strong> Diseño pensado para comodidad y accesibilidad.
                        </p>
                    </div>
                </router-link>
                <router-link to="/palafox" class="cines__link">
                    <div class="cines__card" style="background-image: url('../../images/casco-antiguo.jpg');">
                        <div class="cines__card-title">CASCO ANTIGUO</div>
                        <p class="cines__card-description">
                            <strong>Salas VIP:</strong> Asientos exclusivos tipo lounge. <br>
                            <strong>Servicio a butacas:</strong> Disfruta de comida y bebida sin moverte del asiento.
                            <br>
                            <strong>Ambiente sofisticado:</strong> Perfecto para una experiencia de cine más lujosa.
                        </p>
                    </div>
                </router-link>
            </div>
        </main>
    </App>
</template>
