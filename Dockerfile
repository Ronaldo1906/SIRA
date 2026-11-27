FROM python:3.12-slim



ENV PYTHONDONTWRITEBYTECODE=1 \

    PYTHONUNBUFFERED=1 \
    
    PIP_NO_CACHE_DIR=1
    


RUN apt-get update \

    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends mariadb-server mariadb-client unzip ca-certificates \
    
    && rm -rf /var/lib/apt/lists/*
    


WORKDIR /app

COPY SIRA-desplegable.zip /tmp/SIRA-desplegable.zip

RUN unzip -q /tmp/SIRA-desplegable.zip -d /app \

    && rm /tmp/SIRA-desplegable.zip \
    
    && pip install --no-cache-dir -r /app/backend_sira/requirements.txt \
    
    && chmod +x /app/backend_sira/entrypoint.sh
    


RUN cat > /usr/local/bin/start-sira.sh <<'SH'

#!/bin/sh

set -eu

mkdir -p /run/mysqld

chown -R mysql:mysql /run/mysqld /var/lib/mysql

if [ ! -d /var/lib/mysql/mysql ]; then

  mariadb-install-db --user=mysql --datadir=/var/lib/mysql
  
fi

mariadbd --user=mysql --datadir=/var/lib/mysql --bind-address=127.0.0.1 --port=3306 --skip-name-resolve >/tmp/mariadb.log 2>&1 &

ready=0

for i in $(seq 1 40); do

  if mariadb-admin ping -uroot >/dev/null 2>&1; then ready=1; break; fi
  
  sleep 1
  
done

if [ "$ready" -ne 1 ]; then cat /tmp/mariadb.log; exit 1; fi

mariadb -uroot -e "CREATE DATABASE IF NOT EXISTS sira; CREATE USER IF NOT EXISTS 'sira'@'127.0.0.1' IDENTIFIED BY 'sira'; GRANT ALL PRIVILEGES ON sira.* TO 'sira'@'127.0.0.1'; FLUSH PRIVILEGES;"

if [ ! -f /var/lib/mysql/.sira_initialized ]; then

  mariadb -uroot sira < /app/database/init.sql
  
  touch /var/lib/mysql/.sira_initialized
  
fi

export DB_HOST=127.0.0.1 DB_PORT=3306 DB_USER=sira DB_PASSWORD=sira DB_NAME=sira

cd /app/backend_sira

exec uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-10000}" --workers 1

SH

RUN chmod +x /usr/local/bin/start-sira.sh



EXPOSE 10000

CMD ["/usr/local/bin/start-sira.sh"]













