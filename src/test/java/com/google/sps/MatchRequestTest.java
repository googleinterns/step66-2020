package com.google.sps;

import com.google.sps.data.MatchRequest;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/** */
@RunWith(JUnit4.class)
public final class MatchRequestTest {
  @Test
  public void matchRequestGetCriteria() {
    MatchRequest myRequest = new MatchRequest("machine learning");
    String expected = "machine learning";
    Assert.assertEquals(expected, myRequest.getCriteria());
  }
}
