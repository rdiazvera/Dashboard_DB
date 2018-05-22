# === Python file that contains all the dictionaries builders === #

# Trending Topics Dictionary Builder
def build_topics_dict(self, r):
    result = {}
    result['topic'] = r[0]
    result['count'] = r[1]
    return result

# Number of Dislikes Dictionary Builder
def build_count_dict(self, r):
    result = {}
    result['date'] = r[0]
    result['count'] = r[1]
    return result

# Active Users Dictionary Builder
def build_users_dict(self, r):
    result = {}
    result['username'] = r[0]
    result['message_count'] = r[1]
    result['replies_count'] = r[2]
    result['total_actions'] = r[3]
    return result