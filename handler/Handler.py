from flask import jsonify
from dao.DAO import DAO
from handler import buildDict

class Handler:

    def getTrendingTopics(self):
        dao = DAO()
        result = dao.getTrendingTopics()
        mapped_result = []
        for r in result:
            mapped_result.append(buildDict.build_topics_dict(self, r))
        return jsonify(Topics=mapped_result)

    def getMessages(self):
        dao = DAO()
        result = dao.getMessages()
        mapped_result = []
        for r in result:
            mapped_result.append(buildDict.build_count_dict(self, r))
        return jsonify(NumberOfMessages=mapped_result)

    def getReplies(self):
        dao = DAO()
        result = dao.getReplies()
        mapped_result = []
        for r in result:
            mapped_result.append(buildDict.build_count_dict(self, r))
        return jsonify(NumberOfReplies=mapped_result)

    def getLikes(self):
        dao = DAO()
        result = dao.getLikes()
        mapped_result = []
        for r in result:
            mapped_result.append(buildDict.build_count_dict(self, r))
        return jsonify(NumberOfLikes=mapped_result)

    def getDislikes(self):
        dao = DAO()
        result = dao.getDislikes()
        mapped_result = []
        for r in result:
            mapped_result.append(buildDict.build_count_dict(self, r))
        return jsonify(NumberOfDislikes=mapped_result)

    def getActiveUsers(self):
        dao = DAO()
        result = dao.getActiveUsers()
        mapped_result = []
        for r in result:
            mapped_result.append(buildDict.build_count_dict(self, r))
        return jsonify(NumberOfUsers=mapped_result)