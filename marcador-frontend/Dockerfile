FROM nginx:alpine

# Copiamos nuestras apps Angular a la raíz del servidor
COPY dist/marcador-frontend/browser /var/www/marcador-frontend
# Copiamos la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80