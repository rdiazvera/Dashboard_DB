from config.dbconfig import pg_config
import psycopg2


class DAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s" % (pg_config['dbname'], pg_config['user'], pg_config['passwd'])
        self.conn = psycopg2.connect(connection_url)

    def getTrendingTopics(self):
        cursor = self.conn.cursor()
        query = "select hstring, count(*) from hashtags group by hstring order by count(*) desc limit 10;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getMessages(self):
        cursor = self.conn.cursor()
        query = "select date_trunc('day', date_created), count(date_trunc('day', date_created)) from messages " \
                "group by date_trunc('day', date_created) order by date_trunc('day', date_created) desc limit 10;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result


    def getReplies(self):
        cursor = self.conn.cursor()
        query = "select date_trunc('day', date_created), count(date_trunc('day', date_created)) from replies as r, " \
                "messages as m where r.reply_mid = m.mid group by date_trunc('day', date_created) order by " \
                "date_trunc('day', date_created) desc limit 10;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getLikes(self):
        cursor = self.conn.cursor()
        query = "select date_trunc('day', date_created), count(date_trunc('day', date_created)) from reactions " \
                "where type = 'like' group by date_trunc('day', date_created) order by " \
                "date_trunc('day', date_created) desc limit 10;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getDislikes(self):
        cursor = self.conn.cursor()
        query = "select date_trunc('day', date_created), count(date_trunc('day', date_created)) from reactions " \
                "where type = 'dislike' group by date_trunc('day', date_created) order by " \
                "date_trunc('day', date_created) desc limit 10;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getActiveUsers(self):
        cursor = self.conn.cursor()
        query = "select date_trunc('day', date_created), count(date_trunc('day', date_created)) from " \
                "(select uid, date_created from reactions union select uid, date_created from messages) as active_users " \
                "group by date_trunc('day', date_created) order by date_trunc('day', date_created) desc limit 10;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
