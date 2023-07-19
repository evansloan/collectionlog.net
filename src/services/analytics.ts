import ReactGA from 'react-ga4';
import { OpenPage } from './collection-log';

type EventLabel = number|string;

interface AnalyticsEvent {
  category: string;
  action: string;
  label: EventLabel;
}

class AnalyticsService {
  private static readonly GOOGLE_ANALYTICS_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

  private static readonly ACTION_TAB_CHANGE = 'tab_change';
  private static readonly ACTION_PAGE_CHANGE = 'page_change';
  private static readonly ACTION_USER_SEARCH = 'user_search';
  private static readonly CATEGORY_INTERACTION = 'interaction';
  private static readonly CATEGORY_SEARCH = 'search';
  private static readonly EVENT_COLLECTION_LOG = 'collection_log';
  private static readonly EVENT_HISCORES = 'hiscores';

  private static isInitialized = false;

  public static useAnalytics() {
    if (!this.GOOGLE_ANALYTICS_ID) {
      return;
    }

    ReactGA.initialize(this.GOOGLE_ANALYTICS_ID as string);
    this.isInitialized = true;
  }

  /**
   * Send collection_log:interaction:tab_change and collection_log:interaction:page_view events
   * to GA on tab change in collection log page
   *
   * @param tabName Tab changed to
   * @param pageName Page changed to
   */
  public static clTabChangeEvent(activePage: OpenPage) {
    this.collectionLogEvent(this.ACTION_TAB_CHANGE, activePage.tab);
    this.clPageChangeEvent(activePage.page);
  }

  /**
   * Send collection_log:interaction:page_change event to GA on page change in collection log page
   *
   * @param pageName Page changed to
   */
  public static clPageChangeEvent(pageName: string) {
    this.collectionLogEvent(this.ACTION_PAGE_CHANGE, pageName);
  }

  /**
   * Send collection_log:search:user_search event to GA
   *
   * @param username Username searched
   */
  public static clUserSearchEvent(username: string) {
    this.collectionLogEvent(this.ACTION_USER_SEARCH, username, this.CATEGORY_SEARCH);
  }

  /**
   * Send collection_log event to GA
   *
   * @param action Event action
   * @param label Event label
   */
  private static collectionLogEvent(action: string, label: string, category: string = this.CATEGORY_INTERACTION) {
    this.sendEvent(this.EVENT_COLLECTION_LOG, {
      category,
      action,
      label,
    });
  }

  /**
   * Send hiscores:interaction:page_change event to GA
   *
   * @param page Page number changed to
   */
  public static hsPageChangeEvent(page: number) {
    this.hiscoresEvent(this.ACTION_PAGE_CHANGE, page);
  }

  /**
   * Send hiscores:search:user_search event to GA
   *
   * @param username Username searched
   */
  public static hsUserSearchEvent(username: string) {
    this.hiscoresEvent(this.ACTION_USER_SEARCH, username, this.CATEGORY_SEARCH);
  }

  /**
   * Send hiscores event to GA
   *
   * @param action Event action
   * @param label Event label
   */
  private static hiscoresEvent(action: string, label: EventLabel, category: string = this.CATEGORY_INTERACTION) {
    this.sendEvent(this.EVENT_HISCORES, {
      category,
      action,
      label,
    });
  }

  /**
   * Send event to GA
   *
   * @param eventName Name of event
   * @param event Event to send
   */
  private static sendEvent(eventName: string, event: AnalyticsEvent) {
    if (!this.isInitialized) {
      return;
    }
    ReactGA.event(eventName, event);
  }
}

export default AnalyticsService;
