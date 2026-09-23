export const pages=[
 ['Entrantes','PARA COMPARTIR',['Croquetas de jamón','Bruschetta mediterránea','Calamares crujientes','Ensalada burrata','Patatas bravas','Tartar de atún','Provoleta al horno','Empanadas de carne','Pulpo a la plancha','Sopa del día']],
 ['Platos Principales','NUESTRA SELECCIÓN',['Lomo a la parrilla','Salmón al limón','Pasta trufada','Pollo de campo','Risotto de hongos','Hamburguesa de la casa','Paella de mariscos','Costillas glaseadas','Ravioles de ricotta','Pescado del día']],
 ['Postres','UN FINAL DULCE',['Tiramisú','Volcán de chocolate','Cheesecake','Crema catalana','Helado artesanal','Tarta de manzana','Panna cotta','Brownie tibio','Fruta fresca','Affogato']],
 ['Bebidas','PARA ACOMPAÑAR',['Agua mineral','Limonada de la casa','Zumo natural','Café espresso','Cappuccino','Té e infusiones','Refresco','Cerveza sin alcohol','Mocktail cítrico','Agua con gas']]
];
export const descriptions=['Cremoso, fresco y preparado al momento','Con hierbas, aceite de oliva y toque de limón','Crujiente por fuera y suave por dentro','Receta de la casa con ingredientes de temporada'];
export const price=(pageIndex,itemIndex)=>4+((pageIndex*10+itemIndex)*3)%19;
