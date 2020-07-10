package com.google.sps.servlets;

import com.google.sps.data.MatchRepository;
import com.google.gson.Gson;
import com.google.sps.algorithms.MatchQuery;
import com.google.sps.data.MatchRequest;
import com.google.sps.data.User;
import java.io.IOException;
import java.io.BufferedReader;
import java.util.Collection;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for displaying new mentor matches after user fills out match form. */
@WebServlet("/new-matches-query")
public class NewMatchQueryServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Gson gson = new Gson();

    // Convert the JSON to an instance of MatchRequest.
    MatchRequest matchRequest = getMatchRequest(request, gson);

    //get MatchServlet and current user to pass into MatchQuery
    ServletContext servletContext = getServletContext();
    MatchRepository matchRepository = (MatchRepository) servletContext.getAttribute("matchRepository");
    User currentUser = (User) servletContext.getAttribute("currentUser");
    Collection<User> userSavedMatches = matchRepository.getMatchesForUser(currentUser);

    // Find the possible matches.
    MatchQuery matchQuery = new MatchQuery();
    Collection<User> answer = matchQuery.query(matchRequest, userSavedMatches);

    // Convert the answer to JSON
    String jsonResponse = gson.toJson(answer);

    // Send the JSON back as the response
    response.setContentType("application/json");
    response.getWriter().println(jsonResponse);
  }

  private MatchRequest getMatchRequest(HttpServletRequest request, Gson gson) {
      MatchRequest toReturn = new MatchRequest();
      try {
          BufferedReader reader = request.getReader();
          toReturn = gson.fromJson(reader, MatchRequest.class);          
      } catch (Exception e) {
          System.err.println("Exception thrown in getMatchRequest");
      }
      
      return toReturn;
  }

}
