import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserProfile = {
    name : Text;
  };

  type Book = {
    title : Text;
    author : Text;
    genre : Text;
    price : Nat;
    coverImage : Storage.ExternalBlob;
  };

  type BookPreferences = {
    genres : [Text];
  };

  type SellRequest = {
    seller : Principal;
    bookInfo : Book;
    status : { #pending; #reviewed; #accepted };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let books = Map.empty<Text, Book>();
  let bookPreferences = Map.empty<Principal, BookPreferences>();
  let sellRequests = Map.empty<Nat, SellRequest>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(userId : Principal) : async ?UserProfile {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(userId);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query func getBookCatalog() : async [(Text, Book)] {
    // No authorization check needed - book catalog is public for all users including guests
    books.entries().toArray();
  };
};
